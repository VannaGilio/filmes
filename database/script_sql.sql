#Cria banco
create database db_controle_filmes_ab;

#Ativa/entrar banco
use db_controle_filmes_ab;

#Criar tabela
create table tbl_filme(
	id int not null primary key auto_increment,
    nome varchar(80) not null,
    duracao time not null,
    sinopse text not null,
    data_lancamento date not null,
    foto_capa varchar(200),
    link_trailer varchar(200),
    id_classificacao int not null,
    constraint FK_CLASSIFICACAO_FILME
    foreign key (id_classificacao) 
    references tbl_classificacao(id)
);

create table tbl_classificacao(
    id_classificacao int not null primary key auto_increment,
    faixa_etaria varchar(50) not null,
    link_icone_classificacao varchar(200) not null
);

create table tbl_nacionalidade(
    id_nacionalidade int not null primary key auto_increment,
    nacionalidade varchar(50) not null
);

create table tbl_genero(
    id_genero int not null primary key auto_increment,
    genero varchar(50) not null
);

create table tbl_sexo(
    id_sexo int not null primary key auto_increment,
    sexo varchar(20) not null
);

create table tbl_plataforma(
    id_plataforma int not null primary key auto_increment,
    plataforma varchar(50) not null
);

create table tbl_linguagem(
    id_linguagem int not null primary key auto_increment,
    idioma varchar(100) not null,
    codigo_iso varchar(10) not null
);

create table tbl_filme_genero(
    id_filme_genero int not null primary key auto_increment,
    id_filme int not null,
    id_genero int not null,

    constraint FK_GENERO_FILME_GENERO
    foreign key (id_genero)
    references tbl_genero(id_genero),

    constraint FK_FILME_FILME_GENERO
    foreign key (id_filme) 
    references tbl_filme(id)
);

create table tbl_filme_plataforma(
    id_filme_plataforma int not null primary key auto_increment,
    id_filme int not null,
    id_plataforma int not null,

    constraint FK_PLATAFORMA_FILME_PLATAFORMA
    foreign key (id_plataforma)
    references tbl_plataforma(id_plataforma),

    constraint FK_FILME_FILME_PLATAFORMA
    foreign key (id_filme) 
    references tbl_filme(id)
);

create table tbl_filme_linguagem(
    id_filme_plataforma int not null primary key auto_increment,
    id_filme int not null,
    id_linguagem int not null,

    constraint FK_LINGUAGEM_FILME_LINGUAGEM
    foreign key (id_linguagem)
    references tbl_linguagem(id_linguagem),

    constraint FK_FILME_FILME_LINGUAGEM
    foreign key (id_filme) 
    references tbl_filme(id)
);

create table tbl_premiacao(
    id_premiacao int not null primary key auto_increment,
    nome_premiacao varchar(100) not null
);

create table tbl_tipo_premiacao(
    id_tipo_premiacao int not null primary key auto_increment,
    tipo_premiacao varchar(100) not null,
    id_premiacao int not null,

    constraint FK_PREMIACAO_TIPO_PREMIACAO
    foreign key (id_premiacao)
    references tbl_premiacao(id_premiacao)
);

create table tbl_filme_tipo_premiacao(
    id_filme_tipo_premiacao int not null primary key auto_increment,
    id_filme int not null,
    id_tipo_premiacao int not null,

    constraint FK_TIPO_PREMIACAO_FILME_TIPO_PREMIACAO
    foreign key (id_tipo_premiacao)
    references tbl_tipo_premiacao(id_tipo_premiacao),

    constraint FK_FILME_FILME_TIPO_PREMIACAO
    foreign key (id_filme) 
    references tbl_filme(id)
);

create table tbl_ator(
    id_ator int not null primary key auto_increment,
    nome varchar(100) not null,
    idade varchar(100) not null,
    id_sexo int not null,

    constraint FK_SEXO_ATOR
    foreign key (id_sexo)
    references tbl_sexo(id_sexo)
);

create table tbl_diretor(
    id_diretor int not null primary key auto_increment,
    nome varchar(100) not null,
    idade varchar(100) not null,
    id_sexo int not null,

    constraint FK_SEXO_DIRETOR
    foreign key (id_sexo)
    references tbl_sexo(id_sexo)
);

create table tbl_nacionalidade_ator(
    id_nacionalidade_ator int not null primary key auto_increment,
    id_ator int not null,
    id_nacionalidade int not null,

    constraint FK_ATOR_NACIONALIDADE_ATOR
    foreign key (id_ator)
    references tbl_ator(id_ator),

    constraint FK_NACIONALIDADE_NACIONALIDADE_ATOR
    foreign key (id_nacionalidade) 
    references tbl_nacionalidade(id_nacionalidade)
);

create table tbl_filme_ator(
    id_filme_ator int not null primary key auto_increment,
    id_ator int not null,
    id_filme int not null,

    constraint FK_ATOR_FILME_ATOR
    foreign key (id_ator)
    references tbl_ator(id_ator),

    constraint FK_FILME_FILME_ATOR
    foreign key (id_filme) 
    references tbl_filme(id)
);

show tables;

desc tbl_filme;

select * from tbl_filme

#chave estrangeira
ALTER TABLE tbl_filme
ADD id_classificacao INT,
ADD CONSTRAINT fk_classificacao_filme
    FOREIGN KEY (id_classificacao)
    REFERENCES tbl_classificacao(id_classificacao);

ALTER TABLE tbl_tipo_premiacao
ADD id_premiacao INT,
ADD CONSTRAINT FK_PREMIACAO_TIPOPREMIACAO
    FOREIGN KEY (id_premiacao)
    REFERENCES tbl_premiacao(id_premiacao);


DROP TABLE tbl_premiacao;
ALTER TABLE tbl_tipo_premiacao DROP FOREIGN KEY FK_PREMIACAO_TIPOPREMIACAO;
DROP TABLE tbl_tipo_premiacao;

ALTER TABLE tbl_filme_ator
ADD id_ator INT,
ADD CONSTRAINT fk_ator_filme_ator
    FOREIGN KEY (id_ator)
    REFERENCES tbl_ator(id_ator);