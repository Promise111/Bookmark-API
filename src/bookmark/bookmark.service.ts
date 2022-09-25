import { Injectable, ForbiddenException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { BookmarkDto, EditBookmark } from './dto';

@Injectable()
export class BookmarkService {
  constructor(private config: ConfigService, private prisma: PrismaService) {}

  async getBookmarks(userId: number) {
    try {
      const data = await this.prisma.bookMark.findMany({ where: { userId } });
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getBookmarkById(userId: number, bookmarkId: number) {
    try {
      const data = await this.prisma.bookMark.findFirst({
        where: { id: +bookmarkId },
      });
      return data;
    } catch (error) {
      throw error;
    }
  }

  async createBookmark(userId: number, dto: BookmarkDto) {
    try {
      const bookmark = await this.prisma.bookMark.create({
        data: {
          title: dto.title,
          description: dto.description,
          link: dto.link,
          userId,
        },
      });
      return bookmark;
    } catch (error) {
      throw error;
    }
  }

  async editBookmarkById(
    userId: number,
    bookmarkId: number,
    dto: EditBookmark,
  ) {
    try {
      let bookmark = await this.prisma.bookMark.findUnique({
        where: { id: bookmarkId },
      });

      if (!bookmark || bookmark.userId !== userId)
        throw new ForbiddenException({
          message: 'Access to resource denied',
          data: null,
        });

      let updatedBookmark = await this.prisma.bookMark.update({
        where: { id: bookmarkId },
        data: {
          ...dto,
        },
      });

      return updatedBookmark;
    } catch (error) {
      throw error;
    }
  }

  async deleteBookmarkById(userId: number, bookmarkId: number) {
    try {
      let bookmark = await this.prisma.bookMark.findUnique({
        where: { id: bookmarkId },
      });

      if (!bookmark || bookmark.userId !== userId)
        throw new ForbiddenException({
          message: 'Access to resource denied',
          data: null,
        });
      await this.prisma.bookMark.delete({ where: { id: +bookmarkId } });
    } catch (error) {
      throw error;
    }
  }
}
