package com.uet.longhoang.engapp.engapp.controllers;

import com.uet.longhoang.engapp.engapp.entities.DictionaryEntry;
import com.uet.longhoang.engapp.engapp.services.impls.DictionaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/dictionary")
@CrossOrigin("*")
public class DictionaryController {

    @Autowired
    private DictionaryService dictionaryService;

    @GetMapping("/word/{word}")
    public DictionaryEntry[] getWordDefinition(@PathVariable String word) {
        return dictionaryService.getDefinition(word);
    }
}