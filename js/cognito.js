// 共通設定
AWSCognito.config.region = 'ap-northeast-1';
var poolData = {
    UserPoolId : 'ap-northeast-1_IOEk2ct2k',
    ClientId: '7svf8diiuivfmu0r0pb8qenuer'
};
var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

// サインアップ(アプリケーションのユーザー登録)
function signup(){
    var attributeList = [];
    var dataEmail = {
        Name : 'email',
        Value : $('#email').val()
    };
    var attributeEmail = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataEmail);
    attributeList.push(attributeEmail);
    // サインアップ処理
    userPool.signUp($('#email').val(), $('#password').val(), attributeList, null, function(err, result){
        if (err) {
            alert('サインアップに失敗しました');
            return;
        }
        alert('サインアップが完了しました\n' +
        'verification codeを記載したメールを送信しましたので' +
        '次のアクティベーション画面で登録してください');
        $(location).attr('href', 'activation.html');
    });
}

// アクティベーション(登録済みの認証されていないユーザーを確認する)
function activation(){
    var userData = {
        Username : $('#actemail').val(),
        Pool : userPool
    };
    var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
    // アクティベーション処理
    cognitoUser.confirmRegistration($('#actcode').val(), true, function(err, result) {
        if (err) {
            alert('アクティベーションに失敗しました');
            return;
        }
        alert('アクティベーションが完了しました\n' +
        '次の画面でサインインを行ってください');
        $(location).attr('href', 'signin.html');
    });
}

// サインイン(ユーザーの認証)
function signin(){
    var authenticationData = {
        Username : $('#signinemail').val(),
        Password : $('#signinpassword').val()
    };
    var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);
    var userData = {
        Username : $('#signinemail').val(),
        Pool : userPool
    };
    var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            $(location).attr('href', 'mypage.html');
        },
        onFailure: function(err) {
            alert('サインインに失敗しました');
            return;
        },
    });
}
