<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;

/**
 * Gw2LandTaal
 *
 * @ORM\Table(name="gw2_land_taal", indexes={@ORM\Index(name="gw2_land_taal_gw2_taal_tal_id_fk", columns={"tal_lan_id"}), @ORM\Index(name="gw2_land_taal_gw2_land_lan_id_fk", columns={"lan_tal_id"})})
 * @ORM\Entity
 * @ApiResource(
 * shortName="land-taal"
 * )
 */
class Gw2LandTaal
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var \Gw2Land
     *
     * @ORM\ManyToOne(targetEntity="Gw2Land")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="lan_tal_id", referencedColumnName="lan_id")
     * })
     */
    private $lanTal;

    /**
     * @var \Gw2Taal
     *
     * @ORM\ManyToOne(targetEntity="Gw2Taal")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="tal_lan_id", referencedColumnName="tal_id")
     * })
     */
    private $talLan;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getLanTal(): ?Gw2Land
    {
        return $this->lanTal;
    }

    public function setLanTal(?Gw2Land $lanTal): self
    {
        $this->lanTal = $lanTal;

        return $this;
    }

    public function getTalLan(): ?Gw2Taal
    {
        return $this->talLan;
    }

    public function setTalLan(?Gw2Taal $talLan): self
    {
        $this->talLan = $talLan;

        return $this;
    }


}
