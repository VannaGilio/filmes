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
    link_trailer varchar(200)
);

create table tbl_classificacao(
    id_classificacao int not null primary key auto_increment,
    faixa_etaria varchar(10) not null,
    link_icone_classificacao varchar(200) not null
);

create table tbl_nacionalidade(
    id_nacionalidade int not null primary key auto_increment,
    nacionalidade varchar(30) not null
);

create table tbl_tipo_premiacao(
    id_tipo_premiacao int not null primary key auto_increment,
    tipo_premiacao varchar(100) not null
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
    idioma varchar(100) not null
);

show tables;

desc tbl_filme;

select * from tbl_filme