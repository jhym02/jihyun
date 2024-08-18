package com.smhrd.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smhrd.entity.TblMember;

public interface MemberRepository extends JpaRepository<TblMember, String>{
	
public TblMember findByMemIdAndMemPw(String memId,String memPw);
	


	
}
