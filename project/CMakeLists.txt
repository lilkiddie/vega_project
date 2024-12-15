cmake_minimum_required(VERSION 3.8)

project(project)

include(/vcpkg/scripts/buildsystems/vcpkg.cmake)

find_package(Crow CONFIG REQUIRED)
find_package(httplib CONFIG REQUIRED)
find_package(nlohmann_json CONFIG REQUIRED)
find_package(fmt CONFIG REQUIRED)

add_executable(
    app
    main.cpp
    routes/ping.cpp
    routes/companies.cpp
    routes/shares.cpp
)

target_link_libraries(
    app
    PUBLIC
    Crow::Crow
    httplib::httplib
    nlohmann_json::nlohmann_json
    fmt::fmt
)
