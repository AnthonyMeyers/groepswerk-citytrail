<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;

/**
 * Gw2Land
 *
 * @ORM\Table(name="gw2_land", uniqueConstraints={@ORM\UniqueConstraint(name="land_lan_id_uindex", columns={"lan_id"})})
 * @ORM\Entity
 * @ApiResource(
 * shortName="landen"
 * )
 */
class Gw2Land
{
    /**
     * @var int
     *
     * @ORM\Column(name="lan_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $lanId;

    /**
     * @var string
     *
     * @ORM\Column(name="lan_naam", type="string", length=100, nullable=false)
     */
    private $lanNaam;

    /**
     * @var string|null
     *
     * @ORM\Column(name="lan_vlag", type="string", length=200, nullable=true)
     */
    private $lanVlag;

    public function getLanId(): ?int
    {
        return $this->lanId;
    }

    public function getLanNaam(): ?string
    {
        return $this->lanNaam;
    }

    public function setLanNaam(string $lanNaam): self
    {
        $this->lanNaam = $lanNaam;

        return $this;
    }

    public function getLanVlag(): ?string
    {
        return $this->lanVlag;
    }

    public function setLanVlag(?string $lanVlag): self
    {
        $this->lanVlag = $lanVlag;

        return $this;
    }


}
