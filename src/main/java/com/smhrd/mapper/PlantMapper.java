package com.smhrd.mapper;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface PlantMapper {

	public int plantId(String memId);	
	
}
