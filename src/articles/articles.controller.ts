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
 async create(@Body() createArticleDto: CreateArticleDto) {
    return new ArticleEntity( 
  await this.articlesService.create(createArticleDto));
  }
  @Get('drafts')
  @ApiCreatedResponse({type:ArticleEntity})
  async findDrafts() {
    const drafts = await this.articlesService.findDrafts()
    return drafts.map((draft) => new ArticleEntity(draft))
  }

  @Get()
  @ApiOkResponse({type:ArticleEntity,isArray:true})
 async findAll() {
  const articles = await this.articlesService.findAll()
    return articles.map((article) => new ArticleEntity(article));
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
 async update(
  @Param('id' ,ParseIntPipe) id:number ,
  @Body() UpdateArticleDto: UpdateArticleDto ,
 ){
  return new ArticleEntity(
    await this.articlesService.update(id , UpdateArticleDto))
 }

  @Delete(':id')
  @ApiOkResponse({ type: ArticleEntity })
 async  remove(@Param('id' , ParseIntPipe) id:number) {
    return new ArticleEntity(await this.articlesService.remove(id));
  }
}
