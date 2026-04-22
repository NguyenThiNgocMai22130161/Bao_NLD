package vn.edu.hcmuaf.fit.ThreePanthers.services;

import vn.edu.hcmuaf.fit.ThreePanthers.dtos.res.PostSummaryResponseDto;
import vn.edu.hcmuaf.fit.ThreePanthers.dtos.res.CommentResponseDto;
import java.util.List;

public interface UserService {
    void toggleSavePost(String slug);
    List<PostSummaryResponseDto> getSavedPosts();
    List<PostSummaryResponseDto> getViewedPosts();
    List<CommentResponseDto> getUserComments();
}