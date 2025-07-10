package com.example.board.domain.post;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.board.domain.member.Member;

@Repository
public interface PostRepository extends JpaRepository<Post,Long> {
	
	List<Post> findByMember(Member member); 
	
    @Query("SELECT p FROM Post p JOIN FETCH p.member")
    @Override
    List<Post> findAll();
}
