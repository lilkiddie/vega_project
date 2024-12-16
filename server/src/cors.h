#pragma once
#include "crow.h"
#include <iostream>

struct CORSHandler {
    struct context {};

    void before_handle(crow::request& req, crow::response& res, context&) {

        std::cerr << "GOVNO" << std::endl;
        std::cerr << res.body << std::endl;

        res.add_header("Access-Control-Allow-Origin", "http://localhost:3000");
        res.add_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        res.add_header("Access-Control-Allow-Headers", "Content-Type");
    }

    void after_handle(crow::request& req, crow::response& res, context&) {
        if (req.method == crow::HTTPMethod::Options) {
            res.add_header("Access-Control-Allow-Origin", "http://localhost:3000");
            res.add_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
            res.add_header("Access-Control-Allow-Headers", "Content-Type");
            res.code = 200;
            res.end();
        }
    }
};
