package com.uet.longhoang.engapp.controllers;

import com.uet.longhoang.engapp.entities.Dialogue;
import com.uet.longhoang.engapp.services.impls.DialogueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/dialogue")
public class DialogueController {
    @Autowired
    DialogueService dialogueService;
    @GetMapping("/list/all")
    public List<Dialogue> getAllDialogues() {
        return dialogueService.getAllDialogues();
    }
}
