
에러메세지: 
Association 'com.example.board.domain.post.Post.comments' targets the type 'javax.xml.stream.events.Comment' which is not an '@Entity' type
문제상황: 
post 엔티티에 선언된 comments 가 잘못된 타입을 참조하고있었음
import를 잘못해서 Spring/Hibernate가 XML용 Comment 클래스를 엔티티로 착각함
해결방법: 
import com.example.board.domain.comment.Comment; 