#include <iostream>
#include <cstdlib>
#include <string>

// Функция для выполнения системного вызова curl
bool performCurlCommand(const std::string& command) {
    int result = std::system(command.c_str());
    return result == 0;
}

int main() {
    // Команды для выполнения запросов curl
    std::string getCommand1 = "curl -s -o /dev/null -w \"%{http_code}\" http://localhost:18080/api/companies";
    std::string getCommand2 = "curl -s -o /dev/null -w \"%{http_code}\" http://localhost:18080/";
    std::string postCommand1 = "curl -s -o /dev/null -w \"%{http_code}\" -X POST -H \"Content-Type: application/json\" -d '[{\"key\": \"компания1\", \"count\": 100}, {\"key\": \"компания2\", \"count\": 200}]' http://localhost:18080/api/companies/shares";
    std::string postCommand2 = "curl -s -o /dev/null -w \"%{http_code}\" -X POST -H \"Content-Type: application/json\" -d '[{\"key\": \"компания3\", \"count\": 300}]' http://localhost:18080/api/companies/shares";
    std::string postCommand3 = "curl -s -o /dev/null -w \"%{http_code}\" -X POST -H \"Content-Type: application/json\" -d '[]' http://localhost:18080/api/companies/shares";
    std::string postCommand4 = "curl -s -o /dev/null -w \"%{http_code}\" -X POST -H \"Content-Type: application/json\" -d '[{\"key\": \"компания4\", \"count\": 400}, {\"key\": \"компания5\", \"count\": 500}, {\"key\": \"компания6\", \"count\": 600}]' http://localhost:18080/api/companies/shares";

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

    // Выполнение POST-запросов
    std::cout << "Performing POST request to /api/companies/shares (компания1 и компания2): ";
    if (performCurlCommand(postCommand1 + " | grep -q 200")) {
        std::cout << "Success" << std::endl;
    } else {
        std::cout << "Failed" << std::endl;
    }

    std::cout << "Performing POST request to /api/companies/shares (компания3): ";
    if (performCurlCommand(postCommand2 + " | grep -q 200")) {
        std::cout << "Success" << std::endl;
    } else {
        std::cout << "Failed" << std::endl;
    }

    std::cout << "Performing POST request to /api/companies/shares (empty): ";
    if (performCurlCommand(postCommand3 + " | grep -q 200")) {
        std::cout << "Success" << std::endl;
    } else {
        std::cout << "Failed" << std::endl;
    }

    std::cout << "Performing POST request to /api/companies/shares (компания4, компания5, компания6): ";
    if (performCurlCommand(postCommand4 + " | grep -q 200")) {
        std::cout << "Success" << std::endl;
    } else {
        std::cout << "Failed" << std::endl;
    }

    // Дополнительные тесты GET и POST запросов с разными сценариями
    for (int i = 7; i <= 20; ++i) {
        
        std::string postCommand = "curl -s -o /dev/null -w \"%{http_code}\" -X POST -H \"Content-Type: application/json\" -d '[{\"key\": \"компания" + std::to_string(i) + "\", \"count\": " + std::to_string(i * 100) + "}]' http://localhost:18080/api/companies/shares";
        std::cout << "Performing POST request to /api/companies/shares (компания" << i << "): ";
        if (performCurlCommand(postCommand + " | grep -q 200")) {
            std::cout << "Success" << std::endl;
        } else {
            std::cout << "Failed" << std::endl;
        }
    }

    return 0;
}
