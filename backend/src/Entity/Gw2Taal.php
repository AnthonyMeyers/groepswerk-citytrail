<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;

/**
 * Gw2Taal
 *
 * @ORM\Table(name="gw2_taal", uniqueConstraints={@ORM\UniqueConstraint(name="taal_tal_id_uindex", columns={"tal_id"})})
 * @ORM\Entity
 * @ApiResource(
 * shortName="talen"
 * )
 */
class Gw2Taal
{
    /**
     * @var int
     *
     * @ORM\Column(name="tal_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $talId;

    /**
     * @var string|null
     *
     * @ORM\Column(name="tal_naam", type="string", length=100, nullable=true)
     */
    private $talNaam;

    public function getTalId(): ?int
    {
        return $this->talId;
    }

    public function getTalNaam(): ?string
    {
        return $this->talNaam;
    }

    public function setTalNaam(?string $talNaam): self
    {
        $this->talNaam = $talNaam;

        return $this;
    }


}
