package com.uet.longhoang.engapp.engapp.services.impls;

import com.uet.longhoang.engapp.engapp.entities.GrammarRule;
import com.uet.longhoang.engapp.engapp.repositories.GrammarRuleRepository;
import com.uet.longhoang.engapp.engapp.services.interfaces.IGrammarRuleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GrammarRuleService implements IGrammarRuleService {
    @Autowired
    private GrammarRuleRepository grammarRuleRepository;

    @Override
    public List<GrammarRule> getAllGrammarRules() {
        return grammarRuleRepository.findAll();
    }



}
