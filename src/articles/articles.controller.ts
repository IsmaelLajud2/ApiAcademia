import {NotFoundException, Controller, Get, Post, Body, Patch, Param, Delete,ParseIntPipe } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ApiTags ,ApiCreatedResponse,ApiOkResponse } from '@nestjs/swagger';
import { ArticleEntity } from './entities/article.entity';

@Controller('articles')
@ApiTags('articles')

export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @ApiCreatedResponse({type:ArticleEntity})
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(createArticleDto);
  }
  @Get('drafts')
  findDrafts() {
    return this.articlesService.findDrafts()
  }

  @Get()
  @ApiOkResponse({type:ArticleEntity,isArray:true})
  findAll() {
    return this.articlesService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: ArticleEntity })
   async findOne(@Param('id' ,ParseIntPipe) id : number){
    const article = await  this.articlesService.findOne(id)
    if (!article) {
      throw new NotFoundException(`Artilce with ${id} does not exist`)
    }
    return article
    }
  @Patch(':id')
  @ApiOkResponse({ type: ArticleEntity })
 update(
  @Param('id' ,ParseIntPipe) id:number ,
  @Body() UpdateArticleDto: UpdateArticleDto ,
 ){
  return this.articlesService.update(id , UpdateArticleDto)
 }

  @Delete(':id')
  @ApiOkResponse({ type: ArticleEntity })
  remove(@Param('id' , ParseIntPipe) id:number) {
    return this.articlesService.remove(id);
  }
}
