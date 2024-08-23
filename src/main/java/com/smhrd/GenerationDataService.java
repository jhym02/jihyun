package com.smhrd;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GenerationDataService {

    private final GenerationDataDAO generationDataDAO;

    public GenerationDataService(GenerationDataDAO generationDataDAO) {
        this.generationDataDAO = generationDataDAO;
    }

    public List<GenerationData> getGenerationData() {
        return generationDataDAO.getGenerationData();
    }
}

