/*
    task
    1. Напишите функцию подготовки строки, которая заполняет шаблон данными из указанного объекта
    2. Пришлите код целиком, чтобы можно его было проверить
    3. Придерживайтесь code style текущего задания
    4. По необходимости - можете дописать код, методы
    5. Разместите код в гите и пришлите ссылку
*/

/**
 * Класс для работы с API
 *
 * @author		Andrey Ageev
 * @version		v.1.0 (13/11/2024)
 */
class Api {
  constructor() {}

  /**
   * Заполняет строковый шаблон template данными из объекта object
   *
   * @author		Andrey Ageev
   * @version		v.1.0 (13/11/2024)
   * @param		{object} object
   * @param		{string} template
   * @return		{string}
   */
  get_api_path(object, template) {
    let result = template;

    // Поиск и замена всех шаблонных ключей в строке
    for (let key in object) {

      // Кодируем значения (работал с этим методом, еслиб не знал его, то сделал бы реплейс просто ' '=>'%20')
      const value = encodeURIComponent(object[key]);

      // Шаблонный маркер (Сначала пытался сделать через регулярные выражения, но стало лень вспоминать, решил таким образом быстрее)
      const placeholder = `%${key}%`;

      // подставляем нужное значение вместо шаблона
      result = result.replaceAll(placeholder, value);
    }

    return result;
  }
}


let user = {
  id: 20,
  name: 'John Dow',
  role: 'QA',
  salary: 100
};

let api_path_templates = [
  "/api/items/%id%/%name%",
  "/api/items/%id%/%role%",
  "/api/items/%id%/%salary%"
];

let api = new Api();

let api_paths = api_path_templates.map((api_path_template) => {
  return api.get_api_path(user, api_path_template);
});


// Ожидаемый результат
let expected_result = ["/api/items/20/John%20Dow", "/api/items/20/QA", "/api/items/20/100"];

console.log(api_paths); // Распечаткп результата ["/api/items/20/John%20Dow", "/api/items/20/QA", "/api/items/20/100"]
