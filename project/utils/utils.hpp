#pragma once
#include <iostream>
#include <chrono>
#include <iomanip>
#include <sstream>

std::string get_date(size_t delta_days = 0) {
    auto now = std::chrono::system_clock::now();
    auto time = now - std::chrono::hours(24 * delta_days);
    std::time_t t = std::chrono::system_clock::to_time_t(time);
    std::tm tm = *std::localtime(&t);
    std::ostringstream oss;
    oss << std::put_time(&tm, "%Y-%m-%d");
    return oss.str();
}

