package com.smhrd.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;

import com.smhrd.entity.TblLocation;
import com.smhrd.entity.TblPlant;
import com.smhrd.repository.LocationRepository;
import com.smhrd.repository.PlantRepository;

import jakarta.servlet.http.HttpSession;


@Controller
public class PlantController {
	
	@Autowired
	PlantRepository PlantRepo;
	@Autowired
	LocationRepository LocationRepo;
	
	// 발전소 등록
	@PostMapping("/plantRegister")
	public String plantRegister(HttpSession session,TblPlant plant,TblLocation location) {
		
		PlantRepo.save(plant);
		LocationRepo.save(location);
		
		
		return "redirect:loginon";
	}
	
	
}
