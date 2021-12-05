# 🔥 **Assignment Cardoc (with NestJS)**


🧱 **wanted x wecode 프리온보딩 백엔드 코스 - [Assignment 7] Cardoc**
- 일정: 2021년 11월 22일(월) 오후 4시 ~ 11월 29일(월) 오후 2시

  <br>
  
  [카닥 사이트](https://www.cardoc.co.kr/)
  
  <br>
  

## 🌎 **배포**

주소 : [http://49.50.166.149:3000/](http://49.50.166.149:3000/)


<br>
  

## 🤩 **TIL**

[카닥 TIL](https://tristy.tistory.com/50)

<br>

## 🛠 **프로젝트 빌드 및 서버 실행 방법**

- local에서 사용할 시 MySql을 설치해주시고, .env 파일을 설정해주세요.
- [env 파일 설정](https://github.com/WonDongGyun/assignment-7-cardoc/wiki/.env-%ED%8C%8C%EC%9D%BC-%EC%84%A4%EC%A0%95)


1. 상단의 Code 버튼을 눌러 경로를 복사한 후 클론 받습니다.

```
$ git clone https://github.com/WonDongGyun/assignment-7-cardoc.git
```

2. 패키지를 설치합니다.

```
$ npm install
```

3. 서버를 실행해 줍니다.

```
$ npm start
```

4. 정해진 API에 접근하여 서비스를 이용합니다.

<br>

## 📝 **과제 요구사항**

### ✔️ [필수 포함 사항]

- READ.ME 작성
  - 프로젝트 빌드, 자세한 실행 방법 명시
  - 구현 방법과 이유에 대한 간략한 설명
  - 완료된 시스템이 배포된 서버의 주소
  - 해당 과제를 진행하면서 회고 내용 블로그 포스팅
- Swagger나 Postman을 이용하여 API 테스트 가능하도록 구현

<br>

### 📣 [배경 및 공통 요구사항]
- 데이터베이스 환경은 별도로 제공하지 않습니다.
 **RDB중 원하는 방식을 선택**하면 되며, sqlite3 같은 별도의 설치없이 이용 가능한 in-memory DB도 좋으며, 가능하다면 Docker로 준비하셔도 됩니다.
- 단, 결과 제출 시 README.md 파일에 실행 방법을 완벽히 서술하여 DB를 포함하여 전체적인 서버를 구동하는데 문제없도록 해야합니다.
- 데이터베이스 관련처리는 raw query가 아닌 **ORM을 이용하여 구현**합니다.
- Response Codes API를 성공적으로 호출할 경우 200번 코드를 반환하고, 그 외의 경우에는 아래의 코드로 반환합니다.

<br>

### 📙 [구현한 API 목록]
✔️ 사용자 생성 API   

✔️ 로그인 API   

✔️ 사용자가 소유한 타이어 정보를 저장하는 API   


✔️ 사용자가 소유한 타이어 정보 조회 API    


<br>


## 🧬 DB 모델링

![img](https://user-images.githubusercontent.com/52685665/143782987-9172bf9d-326b-458c-89fd-38bb6908d0af.png)

<br>


## 📂 폴더 구조

6개의 domain을 생성했습니다.

- account
- auth
- entities
- search
- transaction
- user

global 폴더: Error Handler 폴더

test 폴더: e2e test 폴더

```
📁 src
├── 📁 domain
│  ├── 📂 user
│  │  ├── 📂 dto
│  │  │  ├── 📄 createUser.dto.ts
│  │  ├── 📂 exception
│  │  │  ├── 📄 NotFoundUserException.ts
│  │  │  ├── 📄 UserOverlapException.ts
│  │  ├── 📄 user.controller.ts
│  │  ├── 📄 user.controller.spec.ts
│  │  ├── 📄 user.module.ts
│  │  ├── 📄 user.repository.ts
│  │  ├── 📄 user.service.spec.ts
│  │  ├── 📄 user.service.ts
│  ├── 📂 tire
│  │  ├── ...
│  ├── 📂 trim
│  │  ├── ...
│  ├── 📂 auth
│  │  ├── 📂 guards
│  │  │  ├── 📄 jwt.guard.ts
│  │  │  └── 📄 localAuth.guard.ts
│  │  ├── 📄 auth.jwtStrategy.ts
│  │  ├── 📄 auth.localStrategy.ts
│  │  ├── 📄 auth.module.ts
│  │  ├── 📄 auth.service.spec.ts
│  │  ├── 📄 auth.service.ts
│  ├── 📂 entities
│  │  ├── 📂 base
│  │  │  └── 📄 base.entity.ts
│  │  ├── 📄 code.entity.ts
│  │  ├── 📄 tire.entity.ts
│  │  ├── 📄 user.entity.ts
│  │  └── 📄 trim.entity.ts
├── 📂 global
│  ├── 📂 common
│  │  ├── 📄 CommonResponse.ts
│  │  ├── 📄 ErrorCode.ts
│  │  └── 📄 ErrorResponse.ts
│  ├── 📂 decorator
│  │  ├── 📄 authUser.decorator.ts
│  │  ├── 📄 saveUserTrimModel.decorator.ts
│  ├── 📂 exceptionHandler
│  │  └── 📄 exceptionHandler
│  ├── 📂 log
│  │  └── 📄 moranLogging.ts
│  ├── 📂 swagger
│  │  └── 📄 setSwagger.ts
│  ├── 📂 util
│  │  └── 📄 tireParse.ts
📁 test
├── 📄 app.e2e-spec.ts
└── 📄 jest-e2e.json
📄 .env
📄 nest-cli.json
📄 package.json
📄 package-lock.json
📄 tsconfig.json
📄 tsconfig.build.json
📄 README.md
```

<br>

## 🔨 사용 기술

-   Backend : <img src="https://img.shields.io/badge/NestJS-E0234E?style=flat&logo=NestJS&logoColor=white"/></a> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=TypeScript&logoColor=white"/></a> 
-   DataBase : <img src="https://img.shields.io/badge/MySql-003B57?style=flat&logo=MySql&logoColor=white"/></a>
-   Collaboration : <img src="https://img.shields.io/badge/Git-F05032?style=flat&logo=Git&logoColor=white"/></a> <img src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=GitHub&logoColor=white"/></a> <img src="https://img.shields.io/badge/Postman-FF6C37?style=flat&logo=Postman&logoColor=white"/></a>
-   Deploy : <img src="https://img.shields.io/badge/Naver Cloud-4FC08D?style=flat&logo=Naver Cloud&logoColor=white"/>

<br>

## 🏫 사용한 프레임워크 & 라이브러리                                                       
- Nest JS 　　　
- config　　　　　
- supertest
- typeorm mysql2
- class-validator & class-transformer
- passport-local & passport-jwt
- morgan
- swagger

<br>

## 🧾 **데이터베이스 설계**

* User
  + `사용자 테이블`에서 id는 넉넉하게 varchar 15를 주었고, password는 bcrypt 암호화를 사용하여 저장하기 때문에 varchar 255를 주었습니다.

* trim
  + 해당 과제는 타이어 API를 설계하고 구현하는 과제입니다. 따라서 `차종 테이블`의 경우에는 제공해주신 자동차 정보 조회 API에서는 타이어를 저장하는데 필요한 차종 ID인 trimId만 저장하도록 설계하였습니다. 사용자가 여러대의 차종을 가질 수 있다고 생각하여 User 테이블과 1:M의 관계를 갖습니다.

* tire
  + `타이어 테이블`은 처음에는 폭, 편평비, 휠사이즈만을 저장하는 테이블을 생각하였으나, 타이어에 대한 정보를 검색해보고 제공해주신 자동차 정보 조회 API를 하나씩 봐보니 항상 {폭}/{편평비}R{18}로 입력되는 것은 아니라는 것을 알았습니다.   

  <p align="center"><img src="https://user-images.githubusercontent.com/52685665/143783886-11078ba7-9797-4a6b-9284-4448c1a4c067.png"></p>

  + 위의 그림은 넥센 타이어 홈페이지에서 가져온 그림입니다. 제공해주신 자동차 정보 조회 API를 보니 타이어 규격이 `국제 타이어 ISO규격`을 따르면서 `TR호칭`을 따른다는것을 발견하였습니다. (모든 trimId를 본것이 아니라 정확하지 않습니다.) 그래서 `폭`, `편평비`, `휠사이즈` 뿐만 아니라 `타이어의 용도`, `타이어의 성질`을 저장하는 컬럼을 추가하여 지금의 데이터베이스가 되었습니다.   

  + 공통 코드 테이블로부터 타이어가 앞쪽인지 뒤쪽인지 구분하게 하였습니다.

* code
  + `공통 코드 테이블`은 다른 테이블에서는 코드 이름만 필요하므로 따로 관계를 연결하지는 않았습니다. 다른 테이블에서 공통 테이블을 사용하려면 codeId를 가지고 있으면 됩니다.


<br>

## 🔐 **인증**

 <p align="center"><img src="https://user-images.githubusercontent.com/52685665/143784339-6732dafb-5a26-44e3-a221-1f78f6728418.png" width="600" height="300"></p>

사용자 인증 방식은 `JWT 방식`을 사용하였습니다. JWT 방식은 쿠키 & 세션 방식과는 다르게 서버에서 세션 저장소를 사용하지 않기 때문에 요청이 많아도 서버에 부하가 그렇게 심하지 않으며, 확장성이 우수해서 추후에 페이스북, 구글 등의 소셜 계정 로그인 방식으로도 바꿀 수 있습니다. `@UseGuards`가 붙은 API는 모두 토큰 값이 필요한 API입니다.

<br>

## 🔧 **사용자가 소유한 타이어 정보를 저장하는 API**

인증 토큰을 발급하고 이후의 API는 인증된 사용자만 호출할 수 있다라는 조건이 붙어있었으나, 해당 API 요구사항에는 id와 trimId를 같이 받고 있었고 한번에 5명까지의 사용자에 대한 요청을 받을 수 있었습니다. 이 부분에서 해당 API는 로그인 없어도 5명의 사용자를 입력할 수 있는 API라고 생각했고, 해당 API에 한해서만 인증 없이 사용할 수 있게 구현하였습니다.  

그리고 이 과제는 타이어 정보를 저장하고 조회하는 타이어 API를 설계하고 구현하는 것이었기 때문에, trim 정보와 tire 정보는 제공해주신 자동차 정보 조회 API를 사용하여 한번에 저장할 수 있도록 하였습니다. 그래서 현재 해당 API의 controller는 다음과 같이 코딩되어 있습니다. `@saveUserTrimModel()`이라는 커스텀 데코레이터를 사용하여 형식에 맞는지 검증하게 하였고, 만약 1개 ~ 5개 사이의 요청이 아니라면 에러를 발생하게 만들었습니다. 

<br>

```javascript
// TrimController

@Controller("trim")
export class TrimController {
	constructor(
		private readonly httpService: HttpService,
		private readonly trimService: TrimService
	) {}

	@Post("")
	@ApiOperation({
		summary: "사용자 차종 저장 API",
		description: "사용자가 소유한 자동차 정보 및 타이어 정보를 저장합니다."
	})
	async userTrim(
		@saveUserTrimModel()
		saveUserTrimDtoModel: SaveUserTrimDto[]
	) {
		const response = [];

		for (const saveUserTrimDto of saveUserTrimDtoModel) {
			const url = process.env.TRIM_API + saveUserTrimDto.trimId;
			const res = await lastValueFrom(this.httpService.get(url));
			response.push(
				await this.trimService.saveUserTrim(
					saveUserTrimDto,
					res.data.spec.driving
				)
			);
		}

		return response;
	}
}
```

<br>

자동차 정보 조회 API를 사용해서 한번에 저장하다보니 `트랜잭션` 설정 없이는 데이터의 무결성이 지켜지지 않았습니다. 예를 들어 trim 데이터는 성공적으로 trim 테이블에 저장되었으나 tire 데이터가 잘못되어 오류가 발생해 타이어 테이블에 저장되지 않은 경우, trim 데이터는 있지만 tire 데이터는 없는 상황이 발생하게 됩니다. 따라서 trim service 에서는 각기 다른 리포지토리에서 불러오는 메소드들을 하나의 트랜잭션으로 묶어서, 하나가 오류가 발생하면 전부 `rollback` 되도록 하였습니다. rollback 되지 않는다면 마지막 작업이 성공적으로 수행되고 나서 `commit` 하게 됩니다. 

<br>

```javascript
// TrimService

@Injectable()
export class TrimService {
	constructor(
		private readonly trimRepository: TrimRepository,
		private readonly tireRepository: TireRepository,
		private readonly userRepository: UserRepository
	) {}

	async saveUserTrim(saveUserTrimDto: SaveUserTrimDto, res) {
		const queryRunner = await getConnection().createQueryRunner();
		await queryRunner.startTransaction();

		const findUser: User = await this.userRepository.findUser(
			saveUserTrimDto.id
		);

		try {
			const createTrim: Trim = await this.trimRepository.saveUserTrim(
				queryRunner.manager,
				findUser,
				saveUserTrimDto.trimId
			);

			await this.tireRepository.saveTrimTire(
				queryRunner.manager,
				createTrim,
				res
			);

			await queryRunner.commitTransaction();
			return createTrim;
		} catch (err) {
			console.log(err);
			await queryRunner.rollbackTransaction();
		} finally {
			await queryRunner.release();
		}
	}
}
```

<br>

## 📡 **global 폴더**

프로젝트에 필요한 설정 코드들을 보관할 수 있도록 global이란 이름의 폴더를 만들었습니다. 현재 해당 폴더에서 관리하는 기능은 다음과 같습니다.

- common: `공통 응답처리`를 위한 기능을 담당합니다. 현재 공통 에러 응답처리만 되어 있습니다.
- decorator: 프로그래머가 작성한 `커스텀 데코레이터` 제공을 담당합니다.
- exceptionHandler: Nestjs의 ExceptionFilter를 사용해서 에러를 전역적으로 처리할 수 있도록 하였습니다.
- log: morgan을 사용한 `로그 설정`을 담당합니다.
- swagger: swagger를 사용해 `API 문서 제공`을 담당합니다.
- util: 해당 어플리케이션에서 사용하는 `function`을 제공합니다. 현재는 타이어 정보 parse 함수를 제공하고 있습니다.

<br>

## 🧭 **네이버 클라우드와 jenkins**

이번 배포는 Naver Cloud 쪽에서 프리온보딩 과정을 진행하는 사람들에게 30만 원 상당의 쿠폰을 협찬해주셔 가지고 AWS가 아니라 네이버 클라우드를 사용해보기로 했습니다. 그동안 AWS로만 배포해서 네이버 클라우드로 배포하는 방식이 낯설었는데, 한국 클라우드 플랫폼이다 보니 AWS에서는 볼 수 없던 친절함 가득한 한글 문서에서 감동을 받았습니다. AWS도 한국어를 지원해주지만 그렇게 친절하지는 않았거든요. 네이버 클라우드는 유튜브에 동영상도 있어서 쉽게 따라 할 수 있어서 좋았습니다.    

<p align="center"><img src="https://user-images.githubusercontent.com/52685665/144067851-0ebc3062-4e5e-4582-ab48-ff998c2df136.png"></p>

<br>

이번에는 전부터 하고 싶었던 배포 자동화를 해보기로 했습니다. 예전부터 컴퓨터에서 열심히 코드 고쳐서 git push를 하고, 바꾼 코드를 받기 위해 매번 클라우드 서버에서 git pull를 하는게 귀찮은 작업이었기 때문입니다. 그래서 이번에는 Jenkins라는 도구를 사용해서 배포 자동화를 만들어 보았습니다. Jenkins를 선택한 이유는 처음으로 해보는 배포 자동화라서 설치 및 사용이 간단하고 무료이며 인터넷에서 정보를 찾기 쉬운 도구를 찾고 있었기 때문입니다. 이것말고도 엄청나게 장점이 많다고 하는데 처음 사용해보는 것이니 꼭 필요한 기능만 사용해서 만들었습니다.

 <br>

그런데 설정하는게 쉬울 줄 알았으나 생각보다 엄청나게 힘들었습니다. Jenkins 서버에 권한 문제로 오류가 나지 않나, ssh key값 전부 설정했다고 생각했는데 Nest js 서버에는 public key를 등록하지 않았다던가... 이런 자잘 자잘한 문제 때문에 엄청 오래 걸렸지만 결국에는 성공했습니다. 

<p align="center"><img src="https://user-images.githubusercontent.com/52685665/144067765-610d148f-5ebe-4e23-a655-6a95a063de38.png"></p>


<br>

## 📜 **morgan + winston**

서버를 올려놓고 보니 오류가 나서 죽어버렸을 때 왜 죽었는지 모르는 경우가 있었습니다. 그래서 오류가 날 때마다 오류를 남겨보기로 했습니다. 그래서 log 관리를 쉽게 해주는 `morgan`, log 기록을 남기고 관리할 수 있게 해주는 winston을 사용해보기로 했습니다. 물론 winston만 사용해도 지장은 없으나, 둘 다 사용해보고 싶었습니다. 😃   

morgan에는 `combined`, `common`, `dev`, `short`, `tiny`가 있는데요. 해보니까 combined가 가장 자세한 log를 출력하는 것 같아서 combined를 선택해서 출력하도록 하였습니다. winston으로는 기존 log의 날짜 포맷과 error시 발생하는 message만 수정해보았습니다. error시의 로그는 최상위 폴더의 dailyLog에 해당 날짜 이름으로 해서 저장하고 있습니다. log를 어떻게 문서에 남겨야 더 좋을지는 더 연구를 해봐야 할 것 같습니다.

<br>

<p align="center"><img src="https://user-images.githubusercontent.com/52685665/144735756-897e1021-392c-42ac-a643-2c0377feec39.png"></p>

<p align="center"><img src="https://user-images.githubusercontent.com/52685665/144735978-f845172d-aee3-42dd-a941-aae654b23054.png"></p>

<br>

## 🐾 **API**

[Postman 주소-링크](https://documenter.getpostman.com/view/18215932/UVJckGYD)

<br>

## 🐾 **API Test 방법**

#### 1. 위의 Postman 주소 링크를 클릭하여 Postman으로 들어갑니다.

#### 2. 회원가입,  API를 이용하여 회원가입, 로그인을 진행합니다.

 <p align="center"><img src="https://user-images.githubusercontent.com/52685665/144608217-dbd135cf-7d64-4c94-ba00-9b8fe03139db.png"></p>
 
 <p align="center"><img src="https://user-images.githubusercontent.com/52685665/143788466-03d10b7c-187b-4dcb-b185-31f425e7a617.png"></p>

<br>

#### 3. 존재하는 회원id와 trimId를 입력하여 차종 정보 API를 사용합니다. 토큰은 필요없습니다. 최대 5개의 입력까지 가능합니다.

 <p align="center"><img src="https://user-images.githubusercontent.com/52685665/144608290-315a60f6-0609-4f3c-8d7b-e46b14eb909c.png"></p>

 <p align="center"><img src="https://user-images.githubusercontent.com/52685665/144608426-40005413-065a-45ea-bede-81c23db6ffc4.png"></p>

<br>

#### 4. 토큰을 Authorization에 설정하고 타입은 Bearer Token을 선택해줍니다. trimId를 입력해서 요청을 보내줍니다.


 <p align="center"><img src="https://user-images.githubusercontent.com/52685665/143788571-02da9952-9d17-44a2-a282-95dd4d0ad59b.png"></p>


<br>


