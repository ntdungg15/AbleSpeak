package com.uet.longhoang.engapp.controllers;

import com.uet.longhoang.engapp.entities.VocabularyWord;
import com.uet.longhoang.engapp.services.impls.VocabularyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/vocabulary")
public class VocabularyController {

    @Autowired
    private VocabularyService vocabularyService;

    @GetMapping("/lesson/{lessonId}")
    public ResponseEntity<List<VocabularyWord>> getLessonVocabulary(@PathVariable String lessonId) {
        List<VocabularyWord> vocabularyList = vocabularyService.getLessonVocabulary(lessonId);
        return ResponseEntity.ok(vocabularyList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<VocabularyWord> getVocabularyById(@PathVariable String id) {
        VocabularyWord vocabulary = vocabularyService.getVocabularyById(id);
        if (vocabulary != null) {
            return ResponseEntity.ok(vocabulary);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<VocabularyWord> createVocabulary(@RequestBody VocabularyWord vocabulary) {
        VocabularyWord savedVocabulary = vocabularyService.saveVocabulary(vocabulary);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedVocabulary);
    }

    @PutMapping("/{id}")
    public ResponseEntity<VocabularyWord> updateVocabulary(@PathVariable String id, @RequestBody VocabularyWord vocabulary) {
        vocabulary.setId(id);
        VocabularyWord updatedVocabulary = vocabularyService.saveVocabulary(vocabulary);
        return ResponseEntity.ok(updatedVocabulary);
    }

    @PatchMapping("/{id}/learned")
    public ResponseEntity<VocabularyWord> updateLearnedStatus(
            @PathVariable String id, 
            @RequestBody Map<String, Boolean> payload) {
        Boolean isLearned = payload.get("isLearned");
        if (isLearned == null) {
            return ResponseEntity.badRequest().build();
        }
        
        VocabularyWord updatedVocabulary = vocabularyService.updateLearnedStatus(id, isLearned);
        if (updatedVocabulary != null) {
            return ResponseEntity.ok(updatedVocabulary);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVocabulary(@PathVariable String id) {
        vocabularyService.deleteVocabulary(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/lesson/{lessonId}/stats")
    public ResponseEntity<Map<String, Object>> getLessonVocabularyStats(@PathVariable String lessonId) {
        long total = vocabularyService.getLessonVocabularyCount(lessonId);
        long learned = vocabularyService.getLessonLearnedVocabularyCount(lessonId);
        
        Map<String, Object> stats = new HashMap<>();
        stats.put("total", total);
        stats.put("learned", learned);
        stats.put("progress", total > 0 ? (double) learned / total : 0);
        
        return ResponseEntity.ok(stats);
    }
    
}