package com.uet.longhoang.engapp.engapp.controllers;

import com.uet.longhoang.engapp.engapp.dtos.TranslationRequest;
import com.uet.longhoang.engapp.engapp.services.impls.DictionaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/dictionary")
@CrossOrigin("*")
public class DictionaryController {

    @Autowired
    private DictionaryService dictionaryService;

    @GetMapping("/translate")
    public ResponseEntity<?> getWordDefinition(@RequestBody TranslationRequest request) {
        try {
            String res =  dictionaryService.translate(request.getFrom(), request.getTo(), request.getText());
            return new ResponseEntity<>(res, HttpStatus.OK);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}