// 共通設定
AWSCognito.config.region = 'ap-northeast-1';
var poolData = {
    UserPoolId : 'ap-northeast-1_IOEk2ct2k',
    ClientId: '7svf8diiuivfmu0r0pb8qenuer'
};
var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

// セッションがサインイン済であるかを判定
var cognitoUser = userPool.getCurrentUser();
if (cognitoUser != null) {
    cognitoUser.getSession(function(err, result) {
        if (result) {
            // サインイン済のとき
            cognitoUser.getUserAttributes(function(err, attrresult) {
                if (err) {
                    alert(err);
                    return;
                }
                // Email(username)を表示
                $("#username").html("Username: " + cognitoUser.username);
            });
        } else {
            // サインイン未了のときサインイン画面に遷移
            $(location).attr('href', 'signin.html');
        }
    });
} else {
    // サインイン未了のときサインイン画面に遷移
    $(location).attr('href', 'signin.html');
}

// サインアウト処理
function signout(){
    cognitoUser.signOut();
    // サインイン画面に遷移
    $(location).attr('href', 'signin.html');
}
