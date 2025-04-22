package com.uet.longhoang.engapp.engapp.controllers;

import com.uet.longhoang.engapp.engapp.entities.GrammarRule;
import com.uet.longhoang.engapp.engapp.services.impls.GrammarRuleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/grammar")
public class GrammarController {
    @Autowired
    GrammarRuleService grammarRuleService;
    @GetMapping("/grammar")
    public List<GrammarRule> getGrammars() {
        return grammarRuleService.getAllGrammarRules();
    }
}
