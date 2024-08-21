package com.smhrd.Controller;

import java.io.IOException;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/Real_Login")
public class Real_Login extends HttpServlet {
    private static final long serialVersionUID = 1L;

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String memId = request.getParameter("memId");
        String memPw = request.getParameter("memPw");

        boolean isLoginSuccess = checkLogin(memId, memPw);

        if (isLoginSuccess) {
            response.sendRedirect("login.jsp?loginSuccess=true");
        } else {
            response.sendRedirect("login.jsp?loginSuccess=false");
        }
    }

    private boolean checkLogin(String memId, String memPw) {
        return "admin".equals(memId) && "password".equals(memPw);
    }
}