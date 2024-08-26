package com.smhrd.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smhrd.entity.TblPlant;
import com.smhrd.repository.PlantRepository;

@Service
public class PlantService {
	
	@Autowired
	PlantRepository PlantRepo;
	
	//INSERT 전용
	public void setPlantRepo(TblPlant plant) {
		PlantRepo.save(plant);
	}
	//DELETE 전용
	
	
	
		
}
