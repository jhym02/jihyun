package com.smhrd.Controller;


import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import com.smhrd.entity.TblMember;
import com.smhrd.repository.MemberRepository;

import jakarta.servlet.http.HttpSession;




@Controller
public class MemberController {

	@Autowired
	MemberRepository MemRepo;

	// 메인 페이지 호출
	@RequestMapping("/main")
	public String goMain() {
		return "main";
	}

	// 로그인
	@RequestMapping("/Real_Login")
	public String Real_Login(String memId, String memPw, HttpSession session) {

		TblMember member = MemRepo.findByMemIdAndMemPw(memId, memPw);

		if (member != null) {
			session.setAttribute("user", member);
		}
		return "redirect:main";
	}

	// 회원가입 화면 이동
	@RequestMapping("/Go_Real_Join")
	public String Go_Real_Join() {

		return "Real_Join";
	}

	// 회원 가입
	@RequestMapping("/Real_Join")
	public String Real_Join(TblMember member) {

		System.out.println(member.getMemBirth());
		MemRepo.save(member);

		return "redirect:main";
	}
	
	// 로그인 화면 이동
		@RequestMapping("/Go_Login")
		public String Go_Login() {

			return "Login";
		}
	

	// 로그아웃
	@RequestMapping("/Logout")
	public String Logout(HttpSession session) {
		session.invalidate();
		return "redirect:main";
	}
	
	@RequestMapping("/KakaoLogSuc")
	public String KakaoLogSuc(String nickname,HttpSession session) {
		
		session.setAttribute("user_nick",nickname);
		
		return "redirect:main";
	}

	// 로그인 후 페이지
		@RequestMapping("/loginon")
		public String gologinon() {
			return "loginon";
		}
		
		// 로그인 후 페이지
		@RequestMapping("/displayData")
		public String goDisplayData() {
			return "displayData";
		}
		
		
		
}


