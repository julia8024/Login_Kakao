# 카카오로 로그인 구현

### 1. 카카오 로그인 API 사용을 위한 어플리케이션 설정

1. 카카오 개발자 사이트 회원가입 (https://developers.kakao.com/)

2. 어플리케이션 추가
	<img width="1440" alt="스크린샷 2022-06-27 오후 12 49 43" src="https://user-images.githubusercontent.com/79641953/175856477-0375e24d-106c-4398-811c-542888865d86.png">
3. 어플리케이션에 사이트 도메인 추가
	<img width="1440" alt="스크린샷 2022-06-27 오후 12 51 40" src="https://user-images.githubusercontent.com/79641953/175856627-aac99cf3-8006-4a4e-96b0-3cd79f7fc4c8.png">

4. 카카오 로그인 활성화
	- 등록하러 가기 클릭
	<img width="967" alt="스크린샷 2022-06-27 오후 12 53 33" src="https://user-images.githubusercontent.com/79641953/175856783-7b8b9c6b-396f-47fc-a638-74ffe66d7478.png">
	- 활성화 버튼 ON
	<img width="964" alt="스크린샷 2022-06-27 오후 12 53 52" src="https://user-images.githubusercontent.com/79641953/175856807-dcef3471-bc80-4df6-b254-ddff2bf45c71.png">

5. 동의항목 활성화
	- 닉네임 값만 가져올 것이기 때문에 닉네임 항목만 활성화
	<img width="1440" alt="스크린샷 2022-06-27 오후 1 01 06" src="https://user-images.githubusercontent.com/79641953/175857435-4e6110eb-e0d6-4780-8d0e-2083651bd70b.png">

### 2. 카카오 로그인 API 활용

1. Javascript 키 복사
	<img width="1440" alt="스크린샷 2022-06-27 오후 12 52 36" src="https://user-images.githubusercontent.com/79641953/175856705-9f320cc7-5992-45a3-bd6f-69ab26043cee.png">

2. 아래 코드 작성
```
	<script src="https://developers.kakao.com/sdk/js/kakao.js"></script>  // import javascript SDK
	<script>
		Kakao.init('f0c454152536914ff6dfbd2e57914ce8');  // 발급받은 키(1.에서 복사한 javascript 키)로 초기화
		console.log(Kakao.isInitialized());  // 키 초기화 확인
	</script>
	<script src="./script.js"></script>
```

### 3. script 작성
<img width="947" alt="스크린샷 2022-06-27 오후 1 22 37" src="https://user-images.githubusercontent.com/79641953/175859528-23f6b0e1-f179-4b3c-a3aa-c7be3040b7ca.png">

1. 전역변수 선언
```
var nickname;  // 로그인 시 사용자 닉네임을 가져올 변수
var flag = false;  // 로그인했는지 여부 파악
```

2. index.html 파일 완성
```
<body>
    <section>
        <h1>LOGIN</h1>
        <p><span id="nickname"></span> 님 안녕하세요.</p>
        <div id="kakao_login" onclick="changeText()">카카오로 로그인</div>
    </section>
</body>
```

3. 버튼 클릭 시 호출하는 함수 - changeText()
```
function changeText() {
    if (!flag) {  // flag == false
        document.querySelector("h1").innerHTML = "LOGIN SUCCESS";
        document.querySelector("#kakao_login").innerHTML = "카카오 로그아웃";
        document.querySelector("p").style.display = "block";
        flag = true;
        kakaoLogin();  // 카카오로 로그인 함수 호출
    } else {
        document.querySelector("h1").innerHTML = "LOGIN";
        document.querySelector("#kakao_login").innerHTML = "카카오로 로그인";
        document.querySelector("p").style.display = "none";
        flag = false;
        kakaoLogout();  // 카카오 로그아웃 함수 호출
    }
}
```

4. 카카오로 로그인 함수 구현 - kakaoLogin()
```
function kakaoLogin() {
	// 동의 화면이 팝업으로 뜨게끔 함
    Kakao.Auth.login({
        scope: 'profile_nickname',  // 활성화한 동의항목의 아이디값 나열
        success: function(response) {
            console.log(response)
            Kakao.API.request({
                url: '/v2/user/me',  // 값 고정
                success: function(res) {
                    var ACCESS_TOKEN = Kakao.Auth.getAccessToken();  // 액세스 토큰 할당
                    Kakao.Auth.setAccessToken(ACCESS_TOKEN);  // 액세스 토큰 사용하게 등록
                    nickname = res.properties['nickname'];  // 사용자 닉네임값을 전역변수 nickname 에 저장
                    changeUserName();  // 웹페이지에 사용자 닉네임 표시되도록 하는 함수 호출
                }
            });
        },
        fail: function(error) {
            console.log(error);
        }
    });
}
```

5. 카카오 로그아웃 함수 구현 - kakaoLogout()
```
function kakaoLogout() {
    Kakao.init('f0c454152536914ff6dfbd2e57914ce8');  // 발급받은 키로 초기화
    console.log(Kakao.isInitialized());  // 키 초기화 확인
    // 토큰이 있는지 확인
    if (Kakao.Auth.getAccessToken()) {
        Kakao.API.request({
            url: '/v1/user/unlink',  // 값 고정
            success: function (response) {
                console.log(response)
            },
            fail: function (error) {
                console.log(error)
            },
        })
        Kakao.Auth.setAccessToken(undefined)  // 토큰 없애기
    }
}
```

6. 사용자 닉네임 표시하는 함수 구현 - changeUserName()
```
function changeUserName() {
    document.querySelector("#nickname").innerHTML = nickname;
}
```

### 실행 화면
