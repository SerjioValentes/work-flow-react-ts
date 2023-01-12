# Mui / Tailwind / React / FireStore / ts
    Есть нюансы - нет слайдера ожидания, не все ошибки обрабатываются и т.д.
    Так же для ускорения разработки иногда использовался тип any 
    Возможно есть лишние зависимости тк тестовый - это ответвление от основного моего шаблона

## Как пользоваться:
    Сначала необходимо зарегистрироваться - Sign Up 
    Далее войти - Sign In
    На странице создания ссылки - добавить пользователей и создать ссылку
    На странице отсчета таймера будет виден обратный отсчет, как только придет с бд 
    Количетсво пользователей не ограничено, которое можно добавить

## Важные моменты
    - Страница авторизации - Записывает в ls access token и просто прверяет на наличие токена в ls
    Для надежности лучше отправлять токен авторизации при каждом обращении в бд (можно реализовать через интерсептор в axios)

    - Файл firebase.ts отсутствует в проекте, для того чтобы его развернуть на своем проекте - нужно создать в корне firebase.ts и создать проект в firebase console и подключить firestore
```
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import 'firebase/firestore';

const firebaseConfig = {
apiKey: "",
authDomain: "",
projectId: "",
storageBucket: "",
messagingSenderId: "",
appId: ""
};

const fire = initializeApp(firebaseConfig);
export const fireDb = getFirestore();
export default fire;
```








