package com.uet.longhoang.engapp.services.impls;

import com.uet.longhoang.engapp.entities.VocabularyWord;
import com.uet.longhoang.engapp.repositories.VocabularyRepoTopic;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class VocabularyService {

    @Autowired
    private VocabularyRepoTopic VocabularyRepoTopic;

    public List<VocabularyWord> getLessonVocabulary(String lessonId) {
        return VocabularyRepoTopic.findByLessonId(lessonId);
    }

    public VocabularyWord getVocabularyById(String id) {
        Optional<VocabularyWord> vocabularyOpt = VocabularyRepoTopic.findById(id);
        return vocabularyOpt.orElse(null);
    }

    public VocabularyWord saveVocabulary(VocabularyWord vocabulary) {
        return VocabularyRepoTopic.save(vocabulary);
    }

    public void deleteVocabulary(String id) {
        VocabularyRepoTopic.deleteById(id);
    }

    public VocabularyWord updateLearnedStatus(String id, boolean isLearned) {
        Optional<VocabularyWord> vocabularyOpt = VocabularyRepoTopic.findById(id);
        if (vocabularyOpt.isPresent()) {
            VocabularyWord vocabulary = vocabularyOpt.get();
            vocabulary.setLearned(isLearned);
            return VocabularyRepoTopic.save(vocabulary);
        }
        return null;
    }
    
    public long getLessonVocabularyCount(String lessonId) {
        return VocabularyRepoTopic.countByLessonId(lessonId);
    }
    
    public long getLessonLearnedVocabularyCount(String lessonId) {
        return VocabularyRepoTopic.countByLessonIdAndIsLearnedTrue(lessonId);
    }
}