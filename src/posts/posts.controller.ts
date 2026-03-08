import { Controller, Get,HttpCode,HttpStatus,Param,ParseIntPipe,Post,Query,Body, Put, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';
import type { Posts } from './interfaces/post.interfaces';
 
@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService){}

    @Get() 
    findAll(@Query('search') search: string): Posts[] {
     const extratAllThePost= this.postsService.findAll();
        if(search){
            return extratAllThePost.filter(post => post.title.includes(search.toLocaleLowerCase()) || post.description.includes(search.toLocaleLowerCase()));
        }
        return extratAllThePost;
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe)id: number): Posts[]
    { const singlePost= this.postsService.findOne(id);
      
        return [singlePost];
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() CreatePostData: Omit<Posts,'id'| "createdAt">): Posts {
        return this.postsService.create(CreatePostData);
    }
    @Put(':id') 
    update(@Param('id', ParseIntPipe) id: number, @Body() updatePostData: Partial<Omit<Posts,'id'|'createdAt'>>): Posts {
        return this.postsService.update(id, updatePostData);
    }

    @Delete('delete/:id') 
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id', ParseIntPipe) id: number): {message: string} {
        return this.postsService.remove(id);
    }   


}
    
