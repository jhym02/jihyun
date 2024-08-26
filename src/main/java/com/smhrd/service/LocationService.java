package com.smhrd.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smhrd.entity.TblLocation;
import com.smhrd.entity.TblPlant;
import com.smhrd.repository.LocationRepository;
import com.smhrd.repository.PlantRepository;

import jakarta.transaction.Transactional;



@Service
public class LocationService {
	
	 @Autowired
	    private PlantRepository plantRepository;

	    @Autowired
	    private LocationRepository locationRepository;

	    @Transactional
	    public void createPlantAndLocation(String plantName, String address) {
	        // Plant 엔티티를 저장
	        TblPlant plant = new TblPlant();
	        plant.setM_pName(plantName);
	        TblPlant savedPlant = plantRepository.save(plant);

	        // 저장된 Plant의 ID를 사용해 Location 엔티티를 저장
	        TblLocation location = new TblLocation();
	        location.setPlant(savedPlant);
	        location.setPAddress(address);
	        locationRepository.save(location);
	    }
	
	
	
	
}

