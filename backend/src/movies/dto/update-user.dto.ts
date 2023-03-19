import { ApiProperty } from "@nestjs/swagger";

export class UpdateMovieDto {
    @ApiProperty()
    title: string;

    @ApiProperty()
    rate: number;

    @ApiProperty()
    description: string;

    @ApiProperty()
    image_url: string;

    @ApiProperty()
    release_date: string;

    @ApiProperty()
    isFavorite: boolean;
}