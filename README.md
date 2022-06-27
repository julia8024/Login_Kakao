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

3. script 작성
