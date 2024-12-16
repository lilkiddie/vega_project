#include <iostream>
#include <cstdlib>
#include <string>

// Функция для выполнения системного вызова curl
bool performCurlCommand(const std::string& command) {
    int result = std::system(command.c_str());
    return result == 0;
}

int test() {
    // Команды для выполнения запросов curl
    std::string getCommand1 = "curl -s -o /dev/null -w \"%{http_code}\" http://localhost:18080/api/companies";
    std::string getCommand2 = "curl -s -o /dev/null -w \"%{http_code}\" http://localhost:18080/";
    std::string postCommand = "curl -s -o /dev/null -w \"%{http_code}\" -X POST -H \"Content-Type: application/json\" -d '[{\"key\": \"компания1\", \"count\": 100}, {\"key\": \"компания2\", \"count\": 200}]' http://localhost:18080/api/companies/shares";

    // Выполнение GET-запросов
    std::cout << "Performing GET request to /api/companies: ";
    if (performCurlCommand(getCommand1 + " | grep -q 200")) {
        std::cout << "Success" << std::endl;
    } else {
        std::cout << "Failed" << std::endl;
    }

    std::cout << "Performing GET request to /: ";
    if (performCurlCommand(getCommand2 + " | grep -q 200")) {
        std::cout << "Success" << std::endl;
    } else {
        std::cout << "Failed" << std::endl;
    }

    // Выполнение POST-запроса
    std::cout << "Performing POST request to /api/companies/shares: ";
    if (performCurlCommand(postCommand + " | grep -q 200")) {
        std::cout << "Success" << std::endl;
    } else {
        std::cout << "Failed" << std::endl;
    }

    return 0;
}