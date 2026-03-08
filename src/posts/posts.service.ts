import { Injectable, NotFoundException } from '@nestjs/common';
import type { Posts } from './interfaces/post.interfaces';

@Injectable()
export class PostsService {
    
    private posts: Posts[] = [
        {
            id: 1,
            title: 'First Post',
            description: 'This is the first post',
            autor: 'John Doe',
            createdAt: new Date(),}
    ];

 
    findAll(): Posts[] {
        return this.posts;
    }


    findOne(id: number): Posts {
        const singlePost= this.posts.find(post => post.id === id);
        if(!singlePost){
            throw new NotFoundException(`Post with id ${id} not found`);
        }       
        return singlePost;

    }

    create(CreatePostData: Omit<Posts,'id'| "createdAt">): Posts {
        const newPost: Posts = {
            ...CreatePostData,
            id: this.getNextId(),
            createdAt: new Date(),
        };
        this.posts.push(newPost);
        return newPost;
    }

    private getNextId():number{
        return this.posts.length > 0 ? Math.max(...this.posts.map(post => post.id)) + 1 : 1;
    }

    update(id:number, updatePostData: Partial<Omit<Posts,'id'|'createdAt'>>):  Posts{
        const postIndex = this.posts.findIndex(post => post.id === id);
        if(postIndex === -1){
            throw new NotFoundException(`Post with id ${id} not found`);
        }   
        const updatedPost = {
            ...this.posts[postIndex],
            ...updatePostData,
        };
        this.posts[postIndex] = updatedPost;
        return updatedPost;
    }

    remove(id: number): {message: string}{
        const postIndex = this.posts.findIndex(post => post.id === id);  
        if(postIndex === -1) {  
            throw new NotFoundException(`Post with id ${id} not found`);
        }   
        this.posts.splice(postIndex, 1);
        return {message: `Post with id ${id} has been removed`};
    }



}
