package com.smhrd.mapper;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

import com.smhrd.entity.PlantListDTO;

@Mapper
public interface PlantMapper {

	public int plantId(String memId);	
	
	public ArrayList<PlantListDTO>plantList(String memId);
	
}
