<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220524080254 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs

        $this->addSql('CREATE TABLE gw_city (id INT AUTO_INCREMENT NOT NULL, country_id INT NOT NULL, name VARCHAR(255) NOT NULL, latidude VARCHAR(255) DEFAULT NULL, longitude VARCHAR(255) DEFAULT NULL, img VARCHAR(255) DEFAULT NULL, INDEX IDX_7306155EF92F3E70 (country_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE gw_country (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, flag VARCHAR(255) DEFAULT NULL, UNIQUE INDEX UNIQ_66A2E115E237E06 (name), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE gw_country_gw_language (gw_country_id INT NOT NULL, gw_language_id INT NOT NULL, INDEX IDX_B2DAD642DDC58D1B (gw_country_id), INDEX IDX_B2DAD64258B5E897 (gw_language_id), PRIMARY KEY(gw_country_id, gw_language_id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE gw_language (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_1AEF8CCD5E237E06 (name), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE gw_monument (id INT AUTO_INCREMENT NOT NULL, city_id INT NOT NULL, name VARCHAR(255) NOT NULL, description LONGTEXT DEFAULT NULL, img VARCHAR(255) DEFAULT NULL, UNIQUE INDEX UNIQ_B58C7FFB5E237E06 (name), INDEX IDX_B58C7FFB8BAC62AF (city_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, email VARCHAR(180) NOT NULL, roles LONGTEXT NOT NULL COMMENT \'(DC2Type:json)\', password VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_8D93D649E7927C74 (email), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE gw_city ADD CONSTRAINT FK_7306155EF92F3E70 FOREIGN KEY (country_id) REFERENCES gw_country (id)');
        $this->addSql('ALTER TABLE gw_country_gw_language ADD CONSTRAINT FK_B2DAD642DDC58D1B FOREIGN KEY (gw_country_id) REFERENCES gw_country (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE gw_country_gw_language ADD CONSTRAINT FK_B2DAD64258B5E897 FOREIGN KEY (gw_language_id) REFERENCES gw_language (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE gw_monument ADD CONSTRAINT FK_B58C7FFB8BAC62AF FOREIGN KEY (city_id) REFERENCES gw_city (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE gw_monument DROP FOREIGN KEY FK_B58C7FFB8BAC62AF');
        $this->addSql('ALTER TABLE gw_city DROP FOREIGN KEY FK_7306155EF92F3E70');
        $this->addSql('ALTER TABLE gw_country_gw_language DROP FOREIGN KEY FK_B2DAD642DDC58D1B');
        $this->addSql('ALTER TABLE gw_country_gw_language DROP FOREIGN KEY FK_B2DAD64258B5E897');

        $this->addSql('DROP TABLE gw_city');
        $this->addSql('DROP TABLE gw_country');
        $this->addSql('DROP TABLE gw_country_gw_language');
        $this->addSql('DROP TABLE gw_language');
        $this->addSql('DROP TABLE gw_monument');
        $this->addSql('DROP TABLE user');
    }
}
