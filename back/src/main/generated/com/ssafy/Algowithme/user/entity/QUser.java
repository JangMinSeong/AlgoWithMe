package com.ssafy.Algowithme.user.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QUser is a Querydsl query type for User
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QUser extends EntityPathBase<User> {

    private static final long serialVersionUID = -841816279L;

    public static final QUser user = new QUser("user");

    public final StringPath code = createString("code");

    public final NumberPath<Integer> gitId = createNumber("gitId", Integer.class);

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    public final StringPath imageUrl = createString("imageUrl");

    public final StringPath nickname = createString("nickname");

    public final SetPath<com.ssafy.Algowithme.user.type.Role, EnumPath<com.ssafy.Algowithme.user.type.Role>> roles = this.<com.ssafy.Algowithme.user.type.Role, EnumPath<com.ssafy.Algowithme.user.type.Role>>createSet("roles", com.ssafy.Algowithme.user.type.Role.class, EnumPath.class, PathInits.DIRECT2);

    public QUser(String variable) {
        super(User.class, forVariable(variable));
    }

    public QUser(Path<? extends User> path) {
        super(path.getType(), path.getMetadata());
    }

    public QUser(PathMetadata metadata) {
        super(User.class, metadata);
    }

}

