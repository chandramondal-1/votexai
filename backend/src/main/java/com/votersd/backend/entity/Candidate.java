package com.votersd.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "candidates")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Candidate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String party;

    private String description;

    private String photoUrl;

    private Integer voteCount = 0;

    @ManyToOne
    @JoinColumn(name = "election_id")
    private Election election;
}
