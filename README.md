# 實做餐廳網站

---
## Installing 
下載專案
```
$git clone https://github.com/king27350/AC-restaurantList-2.git
```
使用終端機安裝套件
**Node Version v10.15.3**
```
$cd ~/AC-restaurantList-2
$npm install
```
載入種子資料至 Mongodb 完成後即可退出
```
$cd ~AC-restaurantList-2/models/seeds
$node restaurantSeeder.js
```
當出現``` data done ```後即可 ``` ctrl + c ```退出，返回至AC-restaurantList-2資料夾
```
$cd ~AC-restaurantList-2
```

**在專案底下新增 .nev 檔案**
為了隱藏敏感資訊，使用 dotenv 套件，新增```.nev```檔案
```
$cd ~AC-restaurantList-2
$touch .nev
```
開啟```.nev```檔案，輸入以下程式碼
```
FACEBOOK_ID= //your Client ID
FACEBOOK_SECRET= //your Client secret
FACEBOOK_CALLBACK=http://localhost:3000/auth/facebook/callback
GOOGLE_ID= //your Client ID
GOOGLE_SECRET= //your Client secret
GOOGLE_CALLBACK=http://localhost:3000/auth/google/callback
```
**環境建置完畢**

---
開啟環境執行SERVER
```
$npm run dev
```
開啟瀏覽器網址輸入
```
http://localhost:3000
```
成功啟動網站，使用以下測試帳號登入

| E-mail | Password |
| ------ | ----------- |
| user1@example.com   | 12345678 |
| user2@example.com | 12345678 |

如要結束，於終端機輸入 ```ctrl + C``` 終止 
### 建構環境與使用套件
+ Node js
bcryptjs
passport 
passport-google-oauth20
passport-facebook
passport-local
connect-flash
dotenv
express-session
+ Mongodb

  

#### 功能描述
+ 尋找特定餐廳
+ 依照分類顯示
+ 查看餐廳資訊
+ 取得限時優惠
+ RESTful 架構
+ 第三方登入
+ 會員註冊、登入功能
+ 新增、修改、刪除功能



#### 專案貢獻者
[Chris Wei](https://github.com/king27350)
