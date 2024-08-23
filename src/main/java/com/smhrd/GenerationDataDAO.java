package com.smhrd;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class GenerationDataDAO {

    private final JdbcTemplate jdbcTemplate;

    public GenerationDataDAO(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<GenerationData> getGenerationData() {
        String sql = "SELECT hour, powerGeneration, cumulativePower, solarRadiation, temperature, windSpeed FROM generation_data";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(GenerationData.class));
    }
}

