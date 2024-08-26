package com.smhrd.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Entity // 해당 클래스가 Scan이 되어지고, Entity역할로써 기능하기 위한 어노테이션
@Data
public class TblLocation {
	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer locationId;
	@OneToOne
	@JoinColumn(name = "plant_id", referencedColumnName = "plantId")
	private TblPlant plant;
	private String pAddress;
	private String zipCode;
	private String pDetail;
}
