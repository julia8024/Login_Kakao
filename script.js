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
                    Kakao.Auth.setAccessToken(ACCESS_TOKEN);
                }
            });
            window.location.href='/Login_kakao/main.html';
        },
        fail: function(error) {
            console.log(error);
        }
    });
}

function kakaoLogout() {
    Kakao.init('f0c454152536914ff6dfbd2e57914ce8');  // 발급받은 키로 초기화
    console.log(Kakao.isInitialized());  // 키 초기화 확인
    // 토큰이 있는지 확인
    if (Kakao.Auth.getAccessToken()) {
        Kakao.API.request({
            url: '/v1/user/unlink',
            success: function (response) {
                console.log(response)
            },
            fail: function (error) {
                console.log(error)
            },
        })
        Kakao.Auth.setAccessToken(undefined)
        window.location.href='/Login_kakao/index.html';
    }
}