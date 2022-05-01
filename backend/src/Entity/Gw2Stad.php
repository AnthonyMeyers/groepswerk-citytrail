<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;

/**
 * Gw2Stad
 *
 * @ORM\Table(name="gw2_stad", uniqueConstraints={@ORM\UniqueConstraint(name="stad_std_id_uindex", columns={"std_id"})}, indexes={@ORM\Index(name="stad_land_lan_id_fk", columns={"std_lan_id"})})
 * @ORM\Entity
 * @ApiResource()
 */
class Gw2Stad
{
    /**
     * @var int
     *
     * @ORM\Column(name="std_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $stdId;

    /**
     * @var string
     *
     * @ORM\Column(name="std_naam", type="string", length=100, nullable=false)
     */
    private $stdNaam;

    /**
     * @var string|null
     *
     * @ORM\Column(name="std_lat", type="string", length=200, nullable=true)
     */
    private $stdLat;

    /**
     * @var string|null
     *
     * @ORM\Column(name="std_long", type="string", length=200, nullable=true)
     */
    private $stdLong;

    /**
     * @var string|null
     *
     * @ORM\Column(name="std_img", type="string", length=200, nullable=true)
     */
    private $stdImg;

    /**
     * @var \Gw2Land
     *
     * @ORM\ManyToOne(targetEntity="Gw2Land")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="std_lan_id", referencedColumnName="lan_id")
     * })
     */
    private $stdLan;

    public function getStdId(): ?int
    {
        return $this->stdId;
    }

    public function getStdNaam(): ?string
    {
        return $this->stdNaam;
    }

    public function setStdNaam(string $stdNaam): self
    {
        $this->stdNaam = $stdNaam;

        return $this;
    }

    public function getStdLat(): ?string
    {
        return $this->stdLat;
    }

    public function setStdLat(?string $stdLat): self
    {
        $this->stdLat = $stdLat;

        return $this;
    }

    public function getStdLong(): ?string
    {
        return $this->stdLong;
    }

    public function setStdLong(?string $stdLong): self
    {
        $this->stdLong = $stdLong;

        return $this;
    }

    public function getStdImg(): ?string
    {
        return $this->stdImg;
    }

    public function setStdImg(?string $stdImg): self
    {
        $this->stdImg = $stdImg;

        return $this;
    }

    public function getStdLan(): ?Gw2Land
    {
        return $this->stdLan;
    }

    public function setStdLan(?Gw2Land $stdLan): self
    {
        $this->stdLan = $stdLan;

        return $this;
    }


}
