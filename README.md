# 항해 대나무숲


## 항해99 주특기언어 과제 Lv.4
개발기간 : 2일

<br/>
<br/>

***

## 프로젝트 소개
주특기언어로 강의를 듣고 CRUD구현
주제는 자유여서 항해에 관련된 주제로 정하면 좋을 것 같아서 결정.

항해에 대해 불만이라던가 좋은점을 익명으로 작성해서 부담없이 소통할 수 있다.

<br/>
<br/>

***


## 사용한 라이브러리
styled components

react - router - dom

json-server

axios

react-query

<br/>
<br/>

***
## 화면구성

홈구성 및 로그인별 상세페이지 로딩 　　　　　　　　　　　회원가입 기능

<img src="./image/home.gif" width="300" height="300">
　　<img src="./image/singup.gif" width="300" height="300">

<br/>

로그인 기능

<img src="./image/login.gif" width="300" height="300"> 

<br/>
<br/>


***
## 주요기능
게시글 입력 기능

로그인 여부 확인 후 게시글 상세페이지 렌더링

게시글 수정, 삭제

로그인, 로그아웃 기능 구현 

회원가입 기능 구현

<br/>
<br/>

***
## 트러블 슈팅

<br/>

### 회원가입 시 'id 또는 password가 존재하지 않습니다.'

1. 오류가 발생한 경로
  
    회원가입 할때 401에러가 나오면서 'id 또는 password가 존재하지 않습니다.'가 나오는데 회원가입에서 나온다는게 
    이해가 되지 않았다. 

2. 오류를 해결하기 위해 시도해본 것들

    에러메세지를 잘못 가져온건 아닌지 로그인 서버경로에 보낸건 아닌지 확인,
    props를 잘못 받아온건 아닌지 확인

    ```jsx
    const handleSignUp = async (props) => {
      try {
        const response = await instance.post(`/register`, {
          email: props.email,
          password: props.password
        })
        return response.data
      }
      catch (error) {
        if (error.response.status === 401) {
          return error.response.data
        }
      }
    }
    ```


3. 오류 해결 방법

    key값을 email이 아니고 id로 보내야 한다는걸 발견했고 email을 id로 변경했더니 정상적으로 201코드가 반환됬다
    이게 명세서의 중요성인것 같다.

  <br/>

### 회원가입이 완료 및 실패했을때 UI에 표시

1. 오류가 발생한 경로
  
    회원가입이 완료 되었을때는 '회원가입 성공'이라는 alert가 잘 뜨지만 실패했을때에도 '회원가입 성공'이 뜬다.

2. 오류를 해결하기 위해 시도해본 것들

    ```jsx
    const mutation = useMutation(handleSignUp,{
      onSuccess: () =>{
        alert('회원가입 성공')
      },
      onError:(error)=>{
        alert(error.message)
      }
    })
    ```
    - onSuccess를 지우고 onError만 띄우려고 하면 아예 어떤 팝업창도 뜨지 않았다.
    - onSuccess의 매개변수에 error를 넣어서 console.log()에 찍어봤을때 에러메세지가 뜨는걸 확인했다.

    <br/>

3. 오류 해결 방법

    onSuccess자체에 조건문을 줘서 성공시, 실패시를 나눠서 했더니 원하는 요청으로 뜨는걸 확인할 수 있었다.
    ```jsx
    const mutation = useMutation(handleSignUp,{
      onSuccess: (error) =>{
        if(error){
          alert(error.message)
        } else {
          alert('성공')
          navigate('/login')
        }
      }
    })
    ```

<br/>


### 로그인 완료 및 실패했을때 UI에 표시

1. 오류가 발생한 경로

    위에 했던 방식으로 로그인을 하려고 했더니 로그인은 성공시에 토큰값을 반환해줘서 그런가 undefind만 떴다. 

    <br/>

2. 오류 해결 방법

    onSuccess에 error는 가져오지 못하나 data는 잘받아와지는 걸 확인함. 
    data.token이 담겨저 온다면 또는 없다면으로 조건문을 줘서 성공 및 실패를 띄워줬다. 
    ```jsx    
    const mutation = useMutation(handleLogin,{
      onSuccess: (data) =>{
        if(data.token){
          Cookies.set('token',data.token,{ expires: expiresInSeconds })
          navigate('/')
        }else{
          setWarningMessage(data.message)
        }
      }
    })
    ```
    이렇게 해주면 위에 회원가입과 마찬가지로 잘 작동되긴 하나 onError로 가져와야하는게 맞을거라고 생각을 하니 해당 코드는 가독성이 너무 떨어진다고 생각이 들었다. 
    아직 해결하지 못해서 해결 후 다시 리드미를 수정해야 할듯 하다.

    <br/>

