# 實做餐廳網站
熟悉NPM套件與使用Express製做網站
![image](https://github.com/king27350/AC-restaurantList/blob/master/index_page.jpg?raw=true)
## Installing 
下載專案
```
$git clone https://github.com/king27350/AC-restaurantList.git
```
使用終端機安裝套件
**Node Version v10.15.3**
```
$cd ~/AC-restaurantList
$npm install
```
載入資料至 Mongodb 完成後即可退出
```
$node restaurantSeeder.js
```
開啟環境執行SERVER
```
$npm run dev
```
開啟瀏覽器網址輸入
```
http://localhost:3000
```
5. 成功啟動網站
6. 如要結束，於終端機輸入 ```ctrl + C``` 終止 
### 建構環境與使用套件
+ Node js
  - body-parser
  - express
  - express-handlebars
  - method-override
  - mongoose
+ Mongodb

  

#### 功能描述
+ 尋找特定餐廳
+ 依照分類顯示
+ 查看餐廳資訊
+ 取得限時優惠
+ 新增修改刪除功能
+ RESTful 架構



#### 專案貢獻者
[Chris Wei](https://github.com/king27350)
