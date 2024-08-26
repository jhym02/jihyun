package com.smhrd.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smhrd.entity.TblPlant;
import com.smhrd.mapper.PlantMapper;
import com.smhrd.repository.PlantRepository;

@Service
public class PlantService {
	
	@Autowired
	PlantRepository PlantRepo;
	@Autowired
	PlantMapper plantMapper;
	
	//INSERT 전용
	public void setPlantRepo(TblPlant plant) {
		PlantRepo.save(plant);
	}
	//DELETE 전용
	
	
	//SELECT 전용
	public int GetPlantId(String memId) {
		
		int plantId =(Integer)plantMapper.plantId(memId);
		
		return plantId;
	}
		
}
