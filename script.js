function kakaoLogin() {
    Kakao.Auth.login({
        scope: 'profile_nickname',
        success: function(response) {
            console.log(response)
            Kakao.API.request({
                url: '/v2/user/me',
                success: (res) => {
                    const kakao_account = res.kakao_account;
                    console.log(kakao_account)
                }
            });
            // window.location.href='./main.html';
        },
        fail: function(error) {
            console.log(error);
        }
    });
}

function kakaoLogout() {
    if (!Kakao.Auth.getAccessToken()) {
        console.log("Not logged in");
        return;
    }
    Kakao.Auth.logout(function(response) {
        alert(response + " logout");
        // window.location.href="/Login";
    });
}